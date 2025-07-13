const pro = async () => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ddd');
      console.log('eqw')
    }, 3000);
  });
  return Promise.resolve('fff');
  
};
console.log('start');

const res = await pro();
console.log('res', res);

console.log('end');