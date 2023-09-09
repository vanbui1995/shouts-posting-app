export const MeteorCall = (name: string, ...args: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    Meteor.call(name, ...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


