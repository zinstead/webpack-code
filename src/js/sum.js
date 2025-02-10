export const sum=function(...args){
    return args.reduce((pre,cur)=>{return pre+cur},0);
}