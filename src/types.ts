export type QueryParams = {
  limit?: string | number;
  skip?: string | number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: { address: { city: string }; name: string; title: string };
  image: string;
};
