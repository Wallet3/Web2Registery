// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Web2Registry {
    mapping(string => string) public users; // uid => secret

    function register(
        string calldata uid,
        string calldata secret,
        bytes memory signature,
        address user
    ) public {
        require(check(uid, secret, signature, user), "Invalid requests");
        users[uid] = secret;
    }

    function hash(string memory uid, string memory secret)
        public
        pure
        returns (bytes32 r)
    {
        bytes memory combined = bytes(string.concat(uid, secret));
        r = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n",
                bytes(Strings.toString(combined.length)),
                combined
            )
        );
    }

    function check(
        string memory uid,
        string memory secret,
        bytes memory signature,
        address user
    ) public pure returns (bool) {
        bytes32 signedHash = hash(uid, secret);
        return (recoverSigner(signedHash, signature) == user);
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }
}
