import MasterChefs from "../models/masterchef.js";
import { ethers } from "ethers";
import abi from '../abi/masterchef.js';
import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017/masterchef?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");

export const getDepositEventDetails = async (req, res, next) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
    // const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);
    const {user,pid,amount,transactionHash} = req.body;
    const masterChef = new MasterChefs({
        user,
        pid,
        amount,
        transactionHash
    })
    const masterchef = await MasterChefs.find({
        transactionHash
    })
    console.log('masterchef ===>', masterChef._id.toString().trim())
    const filterFrom = contract.filters.Deposit(process.env.USER_PUBLIC_KEY, null);
    const filterTo = await contract.queryFilter(filterFrom)
    console.log("filterTo ===>", filterTo)
    await client.connect();
    const database = client.db("masterchef");
    const haiku = database.collection("masterchefs");
    console.log("haiku ===>", haiku)
    console.log("filterTO ===>", filterTo[0].args)
    res.status(200).json(filterTo) 
    const result = await haiku.insertOne({filterTo: filterTo[0].args});
    console.log("result ===>", result)
};

export const getWithdrawEventDetails = async (req, res, next) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
    // const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);
    const {user,pid,amount,transactionHash} = req.body;
    const masterChef = new MasterChefs({
        user,
        pid,
        amount,
        transactionHash
    })
    const masterchef = await MasterChefs.find({
        transactionHash
    })
    console.log('masterchef ===>', masterChef._id.toString().trim())
    const filterFrom = contract.filters.Withdraw(process.env.USER_PUBLIC_KEY, null);
    const filterTo = await contract.queryFilter(filterFrom)
    console.log("filterTo ===>", filterTo)
    await client.connect();
    const database = client.db("masterchef");
    const haiku = database.collection("masterchefs");
    console.log("haiku ===>", haiku)
    console.log("filterTO ===>", filterTo[0].args)
    res.status(200).json(filterTo) 
    const result = await haiku.insertOne({filterTo: filterTo[0].args});
    console.log("result ===>", result)
};

export const getEmergencyWithdrawEventDetails = async (req, res, next) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
    // const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);
    const {user,pid,amount,transactionHash} = req.body;
    const masterChef = new MasterChefs({
        user,
        pid,
        amount,
        transactionHash
    })
    const masterchef = await MasterChefs.find({
        transactionHash
    })
    console.log('masterchef ===>', masterChef._id.toString().trim())
    const filterFrom = contract.filters.EmergencyWithdraw(process.env.USER_PUBLIC_KEY, null);
    const filterTo = await contract.queryFilter(filterFrom)
    console.log("filterTo ===>", filterTo)
    await client.connect();
    const database = client.db("masterchef");
    const haiku = database.collection("masterchefs");
    console.log("haiku ===>", haiku)
    console.log("filterTO ===>", filterTo[0].args)
    res.status(200).json(filterTo) 
    const result = await haiku.insertOne({filterTo: filterTo[0].args});
    console.log("result ===>", result)
};