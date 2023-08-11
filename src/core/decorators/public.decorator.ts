import { SetMetadata } from "@nestjs/common";

export const isPublicKey = Symbol('IsPublic')
export const Public = () => SetMetadata(isPublicKey, true)
