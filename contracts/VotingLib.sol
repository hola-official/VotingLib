// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

library VotingLib {
    struct Voter {
        uint256 aadharNumber;
        string name;
        uint8 age;
        uint8 stateCode;
        uint8 constituencyCode;
        bool isAlive;
        uint256 votedTo;
    }

    struct Candidate {
        string name;
        string partyShortcut;
        string partyFlag;
        uint256 nominationNumber;
        uint8 stateCode;
        uint8 constituencyCode;
    }

    struct Results {
        string name;
        string partyShortcut;
        string partyFlag;
        uint256 voteCount;
        uint256 nominationNumber;
        uint8 stateCode;
        uint8 constituencyCode;
    }
}
