const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPatent = (): any => {
  return {
    inventor: "Ram Thapa",
    industry: "Thapa industry",
    title: "Personal protective equipment and method",
    abstract: "/id",
    date: "2022-08-24",
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): any[] => {
    const len = lens[depth]!;
    return range(len).map((): any => {
      return {
        ...newPatent(),
      };
    });
  };

  return makeDataLevel();
}
