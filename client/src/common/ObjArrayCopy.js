export function ObjArrayCopy(arr){
    let copied = [];
    arr.forEach((obj, index) => {
        copied[index] = {...obj};
    });

    return copied;
}