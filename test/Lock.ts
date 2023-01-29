import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("MetaverseModel", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Erc1948 = await ethers.getContractFactory("ERC1948");
    const contract = await Erc1948.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the symbol", async function () {
      const { contract } = await loadFixture(deployOneYearLockFixture);

      expect(await contract.symbol()).to.equal("MT");
    });

    it("Should set the name", async function () {
      const { contract } = await loadFixture(deployOneYearLockFixture);

      expect(await contract.name()).to.equal("MetaverseToken");
    });


    it("Should set the right owner", async function () {
      const { contract, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await contract.connect(owner).signer.getAddress()).to.equal(owner.address);
    });

    it("Should mint token", async function() {
      const { contract, otherAccount } = await loadFixture(deployOneYearLockFixture);
      const tokenURI = "ipfs://1111111111111";
      await contract.newItem(otherAccount.address, tokenURI);

      expect(await contract.balanceOf(otherAccount.address)).to.equal(1);
      expect(await contract.ownerOf(1)).to.equal(otherAccount.address);
    })

    it("Should get TokenURI", async function() {
      const { contract, otherAccount } = await loadFixture(deployOneYearLockFixture);
      const tokenURI = "ipfs://1111111111111";

      await contract.newItem(otherAccount.address, tokenURI);
      expect(await contract.tokenURI(1)).to.equal(tokenURI);
    })

    it("Should re-write TokenURI", async function() {
      const { contract, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
      const oldtokenURI = "ipfs://1111111111111";
      const newTokenURI = "ipfs://2222222222222";

      await contract.newItem(otherAccount.address, oldtokenURI);
      expect(await contract.tokenURI(1)).to.equal(oldtokenURI);

      await contract.connect(otherAccount).writeData(1, newTokenURI);
      expect(await contract.ownerOf(1)).to.equal(otherAccount.address);
      expect(await contract.tokenURI(1)).to.equal(newTokenURI);
    })

    // it("Should fail if the unlockTime is not in the future", async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });
  });
});

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { contract } = await loadFixture(deployOneYearLockFixture);

//         await expect(contract.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { contract, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(contract.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { contract } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(contract.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { contract } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(contract.withdraw())
//           .to.emit(contract, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { contract, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // await time.increaseTo(unlockTime);

//         // await expect(contract.withdraw()).to.changeEtherBalances(
//         //   [owner, lock],
//         //   [lockedAmount, -lockedAmount]
//         // );
//       });
//     });
//   });
// });
