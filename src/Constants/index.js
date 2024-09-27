export const smartContract = {
  address: '0xe65fe1698b78ec9f608b0036f9d8aedb8cf36e48',
  abi: [
    { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
    {
      name: 'addImageHash',
      type: 'function',
      inputs: [{ name: '_imageHash', type: 'string', internalType: 'string' }],
      outputs: [],
      stateMutability: 'nonpayable'
    },
    {
      name: 'getAllHashes',
      type: 'function',
      inputs: [],
      outputs: [{ name: '', type: 'string[]', internalType: 'string[]' }],
      stateMutability: 'view'
    },
    {
      name: 'getDeployerAddress',
      type: 'function',
      inputs: [],
      outputs: [{ name: '', type: 'address', internalType: 'address' }],
      stateMutability: 'view'
    },
    {
      name: 'getHashByValue',
      type: 'function',
      inputs: [{ name: '_hashValue', type: 'string', internalType: 'string' }],
      outputs: [{ name: '', type: 'string', internalType: 'string' }],
      stateMutability: 'view'
    }
  ]
}
