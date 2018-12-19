export function pagination(current: number, last: number, delta: number): Array<number | string> {
    let left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    const minFromBorder = (delta + 3);
    const rightOffset = Math.max(minFromBorder - current, 0);
    const leftOffset = Math.max(minFromBorder - (last - current + 1), 0);

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left - leftOffset && i < right + rightOffset) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

export function padded(num: number, max: number): string {
    const targetLength = max.toString().length;
    const realLength = num.toString().length;
    const delta = (targetLength - realLength) * 2; // &nbsps approximately two times thinner
    const right = Math.floor(delta / 2);
    const left = delta - right;
    return `${"\xa0".repeat(left)}${num}${"\xa0".repeat(right)}`;
}