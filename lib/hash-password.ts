import { compare, hash } from "bcrypt";

export function hashPass(unHassPass: string) {
    return hash(unHassPass, 10).then((hash: string) => hash);
}

export function isSamePass(unHassPass: string, hashPass: string) {
    return compare(unHassPass, hashPass);
}
