type Parameterizable = {
  [key: string]: string | number;
};

export const queryParamsFrom = (obj: Parameterizable) => {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });
  return params.toString();
};
