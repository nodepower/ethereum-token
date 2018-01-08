#!/bin/bash
cd helpers
cd oracles-combine-solidity
npm install
npm start "../../contracts/NodeToken.sol"
mv ./out/*.sol ../../
rm -f ./out/*.sol
