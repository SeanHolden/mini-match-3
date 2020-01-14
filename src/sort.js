export const sortByY = (a, b) => {
    if (a.y < b.y) return 1;
    if (b.y < a.y) return -1;

    return 0;
};
