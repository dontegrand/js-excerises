let test_array = [2, 4, 1, 6, 5, 7, 3];

/**
 * 冒泡排序：依次比较两个相连的数，较大的向后冒泡继续比较。
 * 少量数据排序
 * 时间复杂度O(n^2)
 * 本地排序，不需要申请额外空间
 * 实际中用得不多
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

/**
 * 选择排序：用标记下标的方法，选择最小的值从头到尾依次交换掉数组上的值。
 * 时间复杂度O(n^2)
 * 本地排序，不需要申请额外空间
 * 实际中用得不多
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

/**
 * 插入排序：依次缓存数组的每个item和index作为目标，然后向前比较，比前面小就让前面的值往后移，自己往前插入(index-1)。
 * 时间复杂度O(n^2)
 * 少量数据
 * 比前面两个用得多，因为前两者都是交换排序，本质需要要3次原子操作
 * @param {数组} array 
 */
function insetSort(array){
    //第一个不用比较，不用插入，所以i从1开始。
    for(let i = 1; i < array.length; i++){
        //缓存目标和对应的下标
        let target = array[i];
        let j = i;
        while(j > 0 && array[j-1] > target){
            array[j] = array[j-1];
            j --;
        }
        array[j] = target; //到头了或者遇到前面比自己小的就把目标放到当前位置
    }
    return array;
}

/**
 * 归并排序：分-归-并。先把数组一分为二，
 * @param {数组} array 
 */
function mergeSort(array){
    console.log("test");
    if(array.length < 2){
        return array;
    }
    let m = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0,m));
    let right = mergeSort(array.slice(m));

    return merge(left,right);
}

function merge(left,right){
    console.log("--",left,"-1-",right)
    let result = [];
    let i = 0, j = 0;
    while(i < left.length && j < right.length){
        if(left[i] <= right[j]){
            result.push(left[i++]);
        }else{
            result.push(right[j++]);
        }
    }
    if(i < left.length){
        result.push(...left.slice(i));
    }
    if(j < right.length){
        result.push(...right.slice(j));
    }
    console.log("-2-",result);
    return result;
};


console.log(mergeSort(test_array));