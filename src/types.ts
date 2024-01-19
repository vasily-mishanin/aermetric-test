export type QueryParams = {
  limit?: string | number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: { city: string; name: string; title: string };
  image: string;
};
