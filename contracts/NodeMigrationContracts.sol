pragma solidity ^0.4.18;


import './NodeToken.sol';


contract NodeMinter01 {

    NodeToken public token;

    function NodeMinter01(address _token) public {
        token = NodeToken(_token);
    }

    function Mint() public {
        token.mint(0x3c6105649901b106c3033fdd4f59d98875b4e0e1, 10843232);
        token.mint(0x6dceac51c265ea56158d85dc30cdc5d121960422, 3772505);
        token.mint(0xefda7773e33f71c8ca11ae6a328358c010a71b0f, 705315);
        token.mint(0xe9007d469f523d3866ac38c98273777c7463a050, 604617);
        token.mint(0x96ed22a27eddd88a5ae397bb846354d0de0604e4, 538890);
        token.mint(0x9662af751280301650bd1eda2421c62e28d25bdc, 527538);
        token.mint(0xa48f71410d01ec4ca59c36af3a2e2602c28d8fc2, 377482);
        token.mint(0xe3946de8d1af84c76c9d91a647fc7a94a2d79dd8, 356250);
        token.mint(0x683f7712c5dba12269678fca71e07973febf4b89, 315846);
        token.mint(0x210363a04747b50ed2f9b47efad122b0969aeea1, 305340);
        token.mint(0xfe3e8882afd58e6ea0aed15f7e8c78188e37a51e, 260506);
        token.mint(0x57a81663d97e7c484c5e120ca7f610b7d03f069a, 207883);
        token.mint(0x552191dfbd1860baaa8b707a6bc1405c15ad24a6, 180451);
        token.mint(0x83f3159aa771c3c5a4860e2db1cdaa2557e97370, 111048);
        token.mint(0x7f6bb654b6b1ad56b825f538f5faa795d4232f96, 110700);
        token.mint(0x870bd18420dbd73e9b24150e6ba2e8120b3101eb, 104443);
        token.mint(0x44f8800748955f23baabba93e7f5cc25ac5630db, 103846);
        token.mint(0xbcec03b5a82be0155a565ad1a5717728a0b1c462, 98916);
        token.mint(0x5b07c11fce07d8aeeddea79c096dce46ce7126ed, 91947);
        token.mint(0xba111e9121dd9b6e96f0772d6cbb995c3be48377, 85411);
        token.mint(0x4e078d6c5398d3c350108920290a40acadc3345d, 74176);
        token.mint(0x52b5875514809e626f515c6473d33b0bebdf2b4c, 70125);
        token.mint(0xcfadc3a5784afc9916d2f78123eec786fd0acde8, 63993);
        token.mint(0x54d2d073b295559a523d8f35c76429e7304408a2, 60802);
        token.mint(0x83991eb46af016d7849bf6065b6ad40c4a031475, 60558);
        token.mint(0x69672e62c3baa1a26b35f212d6d9039c557a818f, 56940);
        token.mint(0x5b48a884bcc549bfabfe1a571bc8e6a7e2722075, 56344);
        token.mint(0x7ed1e469fcb3ee19c0366d829e291451be638e59, 55101);
        token.mint(0x49d04e9ae8b0b512f9f4bf9a03d61f6bd6912070, 54288);
        token.mint(0x41f0933dfacfb746cc630d8cd65a6f45676e04b7, 46683);
        token.mint(0x50ab8ea0a6f062b70bcd2619afc112168873544c, 46210);
        token.mint(0xe8f3fff03b6c1ab409aa04166d848a3dc560a028, 45766);
        selfdestruct(msg.sender);
    }
}

contract NodeMinter02 {

    NodeToken public token;

    function NodeMinter02(address _token) public {
        token = NodeToken(_token);
    }

    function Mint() public {
        token.mint(0xe1aa0615100a1b543fc53907e9c40d75ffa6d623, 44932);
        token.mint(0xe6ef55faf42cb36921c66108275dcc9d4e782c63, 44343);
        token.mint(0x13fa0cfc1dd2de0c40e2df5f40dcb445ef76868b, 44212);
        token.mint(0x0f3032490421d413814345ae15a18facba1c7233, 42750);
        token.mint(0xb9f50045cf31db49dedae524d81100b4bdd07b37, 41368);
        token.mint(0xf13cdf5ddff413d5311057b500f1bbf21dcf5e47, 38476);
        token.mint(0x9202d86b6a411ae34687219583f196601a2dcb5d, 31425);
        token.mint(0x58375b06e38f0e37cdc96a53b394be7aa886814c, 29961);
        token.mint(0x884a65780a8c9deb30380952966fe3a10f016e2a, 29812);
        token.mint(0xa03f3d48ea24d403ab34c013c4b55429b93fbe13, 29637);
        token.mint(0x44a43a92dc4f7fb402543f69ce71df64d56b9a28, 29352);
        token.mint(0x1525274679b192e73f20d537c88280afccf6f353, 29025);
        token.mint(0xd2f756e1a939c9f1300127a27ff25a6a863415c5, 28716);
        token.mint(0x2e9907f18028b534b4dae69b21b3157f5bd41d69, 28591);
        token.mint(0xb6b02065c9fba8dfe53d8191f4c505159b70aaa8, 27507);
        token.mint(0xd96e15623ff44dc1a1d82712f91f2a40f5a0c474, 26932);
        token.mint(0xC579ff41CB307EAe0E5081144F7991fcd10505C6, 26810);
        token.mint(0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be, 24343);
        token.mint(0x687ef791afc00dd58705697f3fa51b57864fa71e, 22648);
        token.mint(0x71c87d39da9003c2a733ae45165d30ff22d9c76c, 21649);
        token.mint(0x64bea49dd8d3a328a4aa4c739d776b0bfdda6128, 21582);
        token.mint(0xaa231c84cac3d61602ff77b26e8ed98ab9bc7053, 21121);
        token.mint(0xb57f1e02518e474268fbc2aa44273d7c2465bf54, 19066);
        token.mint(0x9b1f61ea5d725cf44f2912f9510a538c203327f9, 18396);
        token.mint(0x1b991a9f913c66a81620f69261b1292fc900a7dc, 16800);
        token.mint(0xceddd266a9c6af93281e08f2839f16cc8bdd1959, 16453);
        token.mint(0x82dea6e139657092bc51c4da24dd1d08e4b1c383, 15604);
        token.mint(0xa98cc2d3a8ce71095c5136f991a4467814bced96, 15390);
        token.mint(0x1626e3ff90ce6df1fc52f9d69b61fbbd3015bf52, 15048);
        token.mint(0xffbb725d470d2bdbb6bc91a41ee55a45e2cbdc0a, 15001);
        token.mint(0xb1e6c4b77afa743795b07e99ea4b3315d0dedc22, 13059);
        token.mint(0x0c47890c8ff6688b87b7fb670e0968f4e9aeecdb, 12552);
        token.mint(0x472745526b7f72f7a9eb117e738f309d2abcc1a2, 11145);
        token.mint(0xfee227d3ce6bcfb533ad30d6c95244a13818d6aa, 10813);
        selfdestruct(msg.sender);
    }
}

contract NodeMinter03 {

    NodeToken public token;

    function NodeMinter03(address _token) public {
        token = NodeToken(_token);
    }

    function Mint() public {
        token.mint(0xf96bc5195879cf2aa7967b1cd901db77b5fe3caa, 10755);
        token.mint(0x7e1ac0e8eb5ae5e863dfe8dade098928f553d730, 10416);
        token.mint(0x9d7dbe3eae5815d853e094481e56ddcff869568e, 10017);
        token.mint(0x43eb92f6cd3e878f934d21670e8a14f7844f13a8, 8985);
        token.mint(0xcbb02b553d007b5d90a1fd705ae3752e2db7d857, 8934);
        token.mint(0xa1f1730e4a919ad6c7c1118b6f37bf9aee1ac2a5, 7965);
        token.mint(0x10083b92d16b85b868a68d12933fdf950911f9ee, 7681);
        token.mint(0xc704be39705645e5b4269d0df882ab0d869f0536, 6405);
        token.mint(0xb919f65b5874a18132d711aeb0a852489b06634a, 6285);
        token.mint(0xac1a4c7cb05d083809acb5075062af422fca18be, 6088);
        token.mint(0xdaae34a9a5be250ab6776587388c937aa2ecb86c, 5583);
        token.mint(0xc372d385092b288a9a5e90a04edfbe2438c30517, 5056);
        token.mint(0x0c56d5731649eb56be9b912a7c4f0e78a08009da, 4188);
        token.mint(0x7820774535b91fcea012d0be5a1ab90db9d9e9d0, 3931);
        token.mint(0x0a481a67cb605cdc9e58b489e296d55ad841eb18, 3753);
        token.mint(0x757d4e1ff56855d760a7eab2e8c500ef6eb9aa72, 3708);
        token.mint(0x1b4e5fad3738edae8b48a07007291783b8d980b5, 3689);
        token.mint(0x2198b72a3457c90eb0f55d75e5df72d31abcfd78, 3544);
        token.mint(0x72e57b54934ff4d9e88ee1e486e9fe8b23ea9cd9, 3306);
        token.mint(0xf1bb054fe0be4ed2d5b41cdf3b902303883b78f8, 3238);
        token.mint(0x907806cd5f13389cdbc3a2e1260fb2cfe4b11c98, 3205);
        token.mint(0xbe4016f64fe07c3091a1a650007e19766acb977d, 2991);
        token.mint(0x8ac321f4294b87af15ba8e114d328603d7dad354, 2743);
        token.mint(0x465224dde0b1ef1d97503c2f32caa76ee4223f27, 2511);
        token.mint(0x56704db270497a162278cbe14225d2a6e7dc44b8, 1755);
        token.mint(0x29a39c3981f48e9f0fe87ff6a9a406fe069684db, 1693);
        token.mint(0xc3f0b90174a660c4fc960a8f5f617f8694eb66f7, 1686);
        token.mint(0x0f62388a540e81cb738c9a37fba1730cabae4e5a, 1521);
        token.mint(0xe6be6aad901adfe7676cc9b5c766636f30611156, 1494);
        selfdestruct(msg.sender);
    }
}
