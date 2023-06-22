export type FormData = {
  name: string;
  email: string;
  number: string;
  plan: {
    id: number;
    name: string;
    image: string;
    price: {
      monthly: string;
      yearly: string;
    };
  };
  // addons: {
  //   name: string;
  //   price: string;
  // }[];
  // summary: {
  //   plan: {
  //     name: string;
  //     price: string;
  //   };
  //   addons: {
  //     name: string;
  //     price: string;
  //   }[];
  // };
};
