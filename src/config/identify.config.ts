import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1'

export const identity = (seed: string) => {
  return Secp256k1KeyIdentity.fromSeedPhrase(seed)
}
