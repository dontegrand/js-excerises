const utils = {
    swap(array, a, b) {
        [array[a], array[b]] = [array[b], array[a]]
    },
    randomNum() {
        return Math.floor(Math.random() * 100)
    },
    randomArray() {
        return Array.from(Array(this.randomNum()), _ => this.randomNum())
    }
}

let test_array = utils.randomArray();

/* 斐波拉契数列(1,1,2,3,5,8...) */
//1.基本递归写法，性能差
function fibonacciArray1(n) {
    if (n < 2) {
        return n;
    }
    return fibonacciArray(n - 1) + fibonacciArray(n - 2);
}
//2.动态规划，利用内部缓存数组提升性能
// 利用n作为缓存数组的索引，始终操作一个对象。
function fibonacciArray2(n) {
    let arr = [];
    for (let i = 0; i <= n; i++) {
        arr[i] = 0;
    }
    if (n == 1 || n == 2) {
        return 1;
    } else {
        arr[1] = 1;
        arr[2] = 2;
        for (let j = 3; j <= n; j++) {
            arr[j] = arr[j - 1] + arr[j - 2];
        }
        return arr[n - 1];
    }
}
//3.动态规划-迭代版本，直接用三个变量代表所有。
//性能最优
function fibonacciArray3(n) {
    let first = 1;
    let second = 1;
    let third = 2;
    //此时的n是他们的个数
    for (let i = 2; i < n; i++) {
        third = second + first; //相加后一次交换位置。
        first = second;
        second = third;
    }
    return third;
}

/** 冒泡排序：依次比较两个相连的数，较大的向后冒泡继续比较。
 * 少量数据排序，时间复杂度O(n^2)，本地排序，
 * 不需要申请额外空间，实际中用得不多。
 * @param {数组}} array 
 */
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        //第二次循环的次数是length减去第一次循环的次数
        //再减1的后面的array[j+1]防止数组越界
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j + 1], array[j]] = [array[j], array[j + 1]];
            }
        }
    }
    return array;
}

/** 选择排序：用标记下标的方法，选择最小的值从头到尾依次交换掉数组上的值。
 * 时间复杂度O(n^2)，本地排序，不需要申请额外空间，实际中用得不多。
 * @param {数组} array 
 */
function selectionSort(array) {
    //最后一遍只有一个元素就不用选择了，所以循环length-1次
    for (let i = 0; i < array.length - 1; i++) {
        //声明变量标记每次没排好序里面得最小值的下标
        //内层循环后面的数一直在与最小值比，大就换下标，保证比较位上总是最小的数
        let minIndex = i;
        for (let j = i; j < array.length; j++) {
            if (array[minIndex] > array[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}

/** 插入排序：依次缓存数组的每个item和index作为目标，然后向前比较，比
 * 前面小就让前面的值往后移，自己往前插入(index-1)。
 * 时间复杂度O(n^2)，少量数据，比前面两个用得多，因为前两者都是交换排序，本质需要要3次原子操作。
 * @param {数组} array 
 */
function insetSort(array) {
    //第一个不用比较，不用插入，所以i从1开始。
    for (let i = 1; i < array.length; i++) {
        //缓存目标和对应的下标
        let target = array[i];
        let j = i;
        while (j > 0 && array[j - 1] > target) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = target; //到头了或者遇到前面比自己小的就把目标放到当前位置
    }
    return array;
}

/**归并排序：分-排-并：重点在并。
 * array<=递归分=>left、right<=分别排序=>有序小left、right=>主线程并=>有序array
 * 递归分为小数组，开始排序，排好序按主线程返回成有序小数组继续排序，直到整个数组排序完。
 * 特点：需要额外空间，不是本地排序，相等元素是不会交换前后顺序的，因此是稳定排序，
 * 空间复杂度O(n),时间复杂度O(nlogn)是一种比较优秀的排序算法。
 * * @param {数组} array 
 */
function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }
    let m = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, m));
    let right = mergeSort(array.slice(m));
    return merge(left, right);
}
function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    if (i < left.length) {
        result.push(...left.slice(i));
    }
    if (j < right.length) {
        result.push(...right.slice(j));
    }
    return result;//[1,4]
};

/**快速排序-简单版：分-排-并：重点在分。
 * array<=递归着以末尾标杆一分为三=>按主线程合并=>有序array
 * 缺点：写死了标杆，当目的数组是已序时就做了最差的性能排序。
 * 非本地排序，稳定排序，空间复杂度O(nlogn),时间复杂度O(nlogn)
 * @param {*} array 
 */
function quickSort(array) {
    if (array.length < 2) return array;
    let pivot = array[array.length - 1];
    let left = array.filter((v, i) => v <= pivot && i != array.length - 1);
    let right = array.filter(v => v > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}
/**快速排序-合理版
 * 与简单版不同的是，这里通过合理的分区点选择来避免，使用随机index作为标杆。、
 * 本地排序，非稳定排序，不需要额外空间，空间复杂度O(logn),时间复杂度O(nlogn);
 * @param {*} array 
 * @param {*} start 
 * @param {*} end 
 */
function quickSort2(array, start = 0, end = array.length - 1) {
    if (end - start < 1) return array;
    let pivotIndex = randomApart(array, start, end);
    quickSort2(array, start, pivotIndex - 1);
    quickSort2(array, pivotIndex + 1, end);
    return array;
}
function randomApart(array, start, end) {
    let j = start;
    let randomIndex = Math.floor(Math.random() * (end - start + 1) + start);
    utils.swap(array, randomIndex, end);
    let pivot = array[end];
    for (let i = start; i <= end; i++) {
        if (array[i] <= pivot) {
            utils.swap(array, i, j++);
        }
    }
    return j - 1;
}