// Combine des classes CSS en ignorant les valeurs falsy.
export function joinClassNames(...classes) {
    return classes.filter(Boolean).join(' ');
}