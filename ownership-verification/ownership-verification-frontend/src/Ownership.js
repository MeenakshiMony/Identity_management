// src/Ownership.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import OwnershipContract from './contracts.json';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Alert,
} from '@mui/material';

const backgroundImageUrl = 'https://cryptofortress.app/uploads/images/202401/image_870x_65b0220df286e.webp'; // Background Image
const logoImageUrl = '/logo.jpeg'; // Updated Logo Image URL

const Ownership = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [commodityId, setCommodityId] = useState('');
    const [commodityDetails, setCommodityDetails] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const initWeb3 = async () => {
        if (window.ethereum) {
            const web3 = new Web3(Web3.givenProvider || window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = OwnershipContract.networks[networkId];

            if (deployedNetwork) {
                const contractAddress = deployedNetwork.address;
                const contractABI = OwnershipContract.abi; // Fixed reference to OwnershipContract
                const contract = new web3.eth.Contract(contractABI, contractAddress);
                setContract(contract);
            } else {
                console.error("Smart contract not deployed to the detected network.");
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    useEffect(() => {
        initWeb3();
    }, []);

    const registerCommodity = async () => {
        if (!contract) {
            setMessage('Contract is not initialized. Please try again later.');
            return;
        }
        if (!commodityId || !commodityDetails) {
            setMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            await contract.methods.registerCommodity(commodityId, commodityDetails).send({ from: account });
            setMessage('Commodity registered successfully!');
        } catch (error) {
            console.error("Error registering commodity:", error);
            setMessage('Error registering commodity: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getCommodity = async () => {
        if (!contract) {
            setMessage('Contract is not initialized. Please try again later.');
            return;
        }
        if (!commodityId) {
            setMessage('Please enter a Commodity ID.');
            return;
        }

        setLoading(true);
        try {
            const commodity = await contract.methods.getCommodity(commodityId).call();
            setMessage(`Commodity Details: ID - ${commodity.id}, Owner - ${commodity.owner}, Details - ${commodity.details}`);
        } catch (error) {
            console.error("Error fetching commodity details:", error);
            setMessage('Error fetching commodity details: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container 
            maxWidth="false"  
            style={{ 
                backgroundImage: `url(${backgroundImageUrl})`, 
                backgroundSize: 'cover',  
                backgroundPosition: 'center',  
                backgroundRepeat: 'no-repeat',  
                width: '100vw',  
                height: '100vh', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed', 
                top: 0,
                left: 0,
                zIndex: -1, 
            }}
        >
            <Card sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '10px', 
                width: '90%',  
                maxWidth: '500px',  
                padding: '20px', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
            }}>
                <CardContent>
                    <img 
                        src={logoImageUrl} 
                        alt="Logo" 
                        style={{ width: '100px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
                    />
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Ownership Verification
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        Connected Account: {account}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Commodity ID"
                        variant="outlined"
                        value={commodityId}
                        onChange={(e) => setCommodityId(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Commodity Details"
                        variant="outlined"
                        value={commodityDetails}
                        onChange={(e) => setCommodityDetails(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" onClick={registerCommodity} disabled={loading}>
                            {loading ? 'Registering...' : 'Register Commodity'}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={getCommodity} disabled={loading}>
                            {loading ? 'Fetching...' : 'Get Commodity Details'}
                        </Button>
                    </Box>
                    {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Ownership;
