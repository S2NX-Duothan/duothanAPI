import express, { json } from "express";
const app = express()
import bodyParser from "body-parser";
import cors from "cors";
import { createDrug, createPharmacy, createUser, deleteDrug, deletePharmacy, logOutUser, main, readDrug, readDrugs, readPharmacies, readPharmacy, readUser, readUsers, signInUser, updateDrug, updatePharmacy } from "./connection.js";
const port = process.env.PORT || 3000;



app.use(cors());
app.use(json());    

app.get("/api/status", (req, res) => {
    res.send("check status");
})

// Pharmacy API
app.post("/api/createPharmacy", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await createPharmacy(req.body);
        res.status(200).send('succesfully created pharmacy');
    } catch (err){
        console.log(err);
        res.status(503).send('failed to create pharmacy');
    }
})

app.post("/api/readPharmacies", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await readPharmacies();
        res.status(200).send(result);
    } catch (err){
        console.log(err);
        res.status(503).send('failed to read');
    }
})

app.post("/api/readPharmacy", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await readPharmacy(req.body.pln);
        res.status(200).send(result);
    } catch (err){
        console.log(err);
        res.status(503).send('failed to read');
    }
})

app.post("/api/updatePharmacy", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await updatePharmacy(req.body.pln, req.body.updated);
        res.status(200).send("successfully updated");
    } catch (err){
        console.log(err);
        res.status(503).send('failed to update');
    }
})

app.post("/api/deletePharmacy", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await deletePharmacy(req.body.pln);
        res.status(200).send("successfully deleted");
    } catch (err){
        console.log(err);
        res.status(503).send('failed to delete');
    }
})

// Drug API
app.post("/api/createDrug", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await createDrug(req.body);
        res.status(200).send('succesfully created drug');
    } catch (err){
        console.log(err);
        res.status(503).send('failed to create drug');
    }
})

app.post("/api/readDrugs", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await readDrugs(req.body.query);
        res.status(200).send(result);
    } catch (err){
        console.log(err);
        res.status(503).send('failed to read');
    }
})

app.post("/api/readDrug", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await readDrug(req.body.ndc);
        res.status(200).send(result);
    } catch (err){
        console.log(err);
        res.status(503).send('failed to read');
    }
})

app.post("/api/updateDrug", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await updateDrug(req.body.ndc, req.body.updated);
        res.status(200).send("successfully updated");
    } catch (err){
        console.log(err);
        res.status(503).send('failed to update');
    }
})

app.post("/api/deleteDrug", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await deleteDrug(req.body.ndc);
        res.status(200).send("successfully deleted");
    } catch (err){
        console.log(err);
        res.status(503).send('failed to delete');
    }
})

// User API
app.post("/api/createUser", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await createUser(req.body);
        res.status(200).send('succesfully created user');
    } catch (err){
        console.log(err);
        res.status(503).send('failed to create user');
    }
})

app.post("/api/readUsers", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await readUsers();
        res.status(200).send(result);
    } catch (err){
        console.log(err);
        res.status(503).send('failed to read');
    }
})

app.post("/api/readUser", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await readUser(req.body.email);
        res.status(200).send(result);
    } catch (err){
        console.log(err);
        res.status(503).send('failed to read');
    }
})

app.post("/api/updateUser", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await updateDrug(req.body.email, req.body.updated);
        res.status(200).send("successfully updated");
    } catch (err){
        console.log(err);
        res.status(503).send('failed to update');
    }
})

app.post("/api/deleteUser", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await deleteDrug(req.body.email);
        res.status(200).send("successfully deleted");
    } catch (err){
        console.log(err);
        res.status(503).send('failed to delete');
    }
})

app.post("/api/signInUser", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await signInUser(req.body.email, req.body.password);
        // console.log(result);
        if(result) return res.status(200).send("logged in");
        return res.status(503).send("failed to login");
    } catch (err){
        console.log(err);
        return res.status(503).send("failed to login");
    }
})

app.post("/api/logOutUser", async(req, res) => {
    try{
        main().catch(console.error);
        let result = await logOutUser(req.body.email);
        // console.log(result);
        if(result) return res.status(200).send("logged out");
        return res.status(503).send("failed to log out");
    } catch (err){
        console.log(err);
        return res.status(503).send("failed to log out");
    }
})

app.post("/api/search", async (req, res) => {
    try{

    } catch (err) {

    }
})
app.listen(port, ()=>{
    console.log("Listening on port", port);
});