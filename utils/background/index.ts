export function drawBackground(ref: string, path: string) {
  const drawFunction = (window as any)[`draw${path}`];
  
  if (drawFunction) {
    return drawFunction;
  } else {
    // 如果没有找到对应的函数，返回一个错误处理函数
    return () => {
      console.error(`没有draw${path}这个函数`);
    };
  }
}