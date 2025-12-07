export const normalizeId = <T extends Record<string, any>>(row: T) => ({
    ...row,
    id: row.id || row._id,
  });
  
  export const toTagArray = (v: string | string[] | undefined) =>
    Array.isArray(v)
      ? v
      : v
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
  
  export const toTagString = (arr: string[]) => arr.join(", ");
  