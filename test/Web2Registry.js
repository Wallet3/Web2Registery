const Web2Registry = artifacts.require('Web2Registry');

contract('Web2Registry', (accounts) => {
  it('tests keccak 256', async () => {
    const instance = await Web2Registry.deployed();

    const uid = `0x408c4b1e430b81fbcdbfc353180db3934079e5f26b2351ba47b5a9f7076d9805`;
    const secret = `{"ct":"/MaN8YalHmo+vsrExAU+FM04/2HZZ8x2Yg0H8f2Jgo0KKNeVrRBBwkjmW5Jy7vjVp1YssnmzthuGoBURIuwBpPv7QFTSfzu+oMsmfaw4whWjmOzLeAkgdaxiGufZ5LB225uiY8Z0II7rseUhfKUWIUsnrWqu/rAAualYh46BTzEg0aVrptDnqSvxC7RjdWCR7E0jGyPuGvDtkVlgav9Beg==","iv":"01611cb3caa88cf33745f37af7e1e38d","s":"2bc061654ccdd23a"}`;

    const keccak256 = '0xb3e32578594cce4712bc90bd372458b6e5a3e3ea785c2b50ba2994e855a02ca5';

    const result = await instance.hash(uid, secret);
    assert.equal(result, keccak256);
  });

  it('tests signature', async () => {
    const instance = await Web2Registry.deployed();

    const uid = `0x408c4b1e430b81fbcdbfc353180db3934079e5f26b2351ba47b5a9f7076d9805`;
    const secret = `{"ct":"3i9g1g9WLACigyKQKiE9XjfzcOIIcOxBPTPcLXnm6Xe3y6Im9zQf+mPbBilm2MsN7V1VH2I9Cs7wjFfVS8i44K0C7uA8PPmVBFGCwSJyaTvBW3egTEGeFZEEfFkoBptC/+/PCQgePgJ9G1OiQL+YSU18XGNcfCcWih4JVQE9Xy7iYPoAF3h81zq+1Xx/JViB0GXPOvMjYxWCspWIFACsgA==","iv":"d69e5bee8a698cbf973f96c0bebaa8a9","s":"66efc0095b4f7498"}`;
    const user = `0xd2fd874464D132ce4E87fb22c5Cc84500818cffa`;
    const signature = `0x87e2ffe7507b73ba504171128242a95e08a7657133aaa37138cecb7a82ddf78d644398c2c9b04dead0fea3ec224409534bbf20af721ada4452eb4e1a4099eb821c`;

    const result = await instance.check(uid, secret, signature, user);
    assert.equal(result, true);
  });

  it('tests failed signature', async () => {
    const instance = await Web2Registry.deployed();

    const uid = `0x408c4b1e430b81fbcdbfc353180db3934079e5f26b2351ba47b5a9f7076d9805`;
    const secret = `{"ct":"3i9g1g9WLACigyKQKiE9XjfzcOIIcOxBPTPcLXnm6Xe3y6Im9zQf+mPbBilm2MsN7V1VH2I9Cs7wjFfVS8i44K0C7uA8PPmVBFGCwSJyaTvBW3egTEGeFZEEfFkoBptC/+/PCQgePgJ9G1OiQL+YSU18XGNcfCcWih4JVQE9Xy7iYPoAF3h81zq+1Xx/JViB0GXPOvMjYxWCspWIFACsgA==","iv":"d69e5bee8a698cbf973f96c0bebaa8a9","s":"66efc0095b4f7498"}`; //`{"ct":"wzHfRy650N9HVXONdcBtVTiHhaG276ykAj/e2DZnlmZHxOsuq6zRvaMKF4PJfC3jR2hgVrEhhZCCPqDs5dP19L3UPIIOtzkTl1wIRphIEfqE2WVBSONdXLrlr8D/sOtBLPIDSJv1yHT/Q1KN7F3dP30wERQQdQ6yF0Z9QLL0RL2GZyH6so8Za7+bOp6wvz+Agv0Ig5fM8FvMABWtNrNYGQ==","iv":"eee6a2f9a9367bc31b868079952a9298","s":"63d893cb3d8b1ed7"}`
    const user = `0x85914616D4D3B4f85C9015d84907536D7cE6003C`;
    const signature = `0x3e274552a6006f63649b3bd51d743cf533e7d1eae6a4bdf43e6ed5bc7687dddc54e656a0f3496cc15b4f0964b285f64a4701bb5d4b0ebae5ab3d0e72221fb5131b`;

    const result = await instance.check(uid, secret, signature, user);
    assert.equal(result, false);
  });
});
