export function generateData(count: number) {
  const algorithms = [
    {
      shortName: 'AES',
      name: 'Advanced Encryption Standard',
      keyBits: '128/192/256',
      securityLevel: 'High',
    },
    {
      shortName: 'RSA',
      name: 'Rivest-Shamir-Adleman',
      keyBits: '1024/2048/4096',
      securityLevel: 'Very High',
    },
    {
      shortName: 'ECC',
      name: 'Elliptic Curve Cryptography',
      keyBits: '256/384/521',
      securityLevel: 'High',
    },
    {
      shortName: 'DES',
      name: 'Data Encryption Standard',
      keyBits: '56',
      securityLevel: 'Low',
    },
    {
      shortName: '3DES',
      name: 'Triple DES',
      keyBits: '168',
      securityLevel: 'Medium',
    },
    {
      shortName: 'Blowfish',
      name: 'Blowfish',
      keyBits: '32-448',
      securityLevel: 'Medium',
    },
    {
      shortName: 'Twofish',
      name: 'Twofish',
      keyBits: '128/192/256',
      securityLevel: 'High',
    },
    {
      shortName: 'ChaCha20',
      name: 'ChaCha20',
      keyBits: '256',
      securityLevel: 'High',
    },
    {
      shortName: 'RC4',
      name: 'Rivest Cipher 4',
      keyBits: '40-2048',
      securityLevel: 'Low',
    },
  ];

  return algorithms.slice(0, count); // Return only the required number of items
}
