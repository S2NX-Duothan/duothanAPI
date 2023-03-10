import {MongoClient} from 'mongodb';
let client;

export async function main() {
    const uri = "mongodb+srv://shiwanthah:eKQxrSxug7nfDaoM@cluster0.rnqrr28.mongodb.net/?retryWrites=true&w=majority";
    client = new MongoClient(uri);
    try{
        await client.connect();
        await listDatabses(client);
    } catch (e) {
        console.log(e);
    } finally{
        await client.close();
    }
}

// main().catch(console.error)

export async function listDatabses(client) {
    let databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// Pharmacy functions
export async function createPharmacy(newPharmacy) {
    const result = await client.db('duothan').collection('pharmacy').insertOne(newPharmacy);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

export async function readPharmacies() {
    const cursor = await client.db('duothan').collection('pharmacy').find();
    const results = await cursor.toArray();
 
    return results;
    if(results.length > 0) {
        results.forEach((result)=>{
            console.log(result);
        });
    } else{
        console.log("empty set");
    }
}

export async function readPharmacy(pharmacy_license_no) {
    const result = await client.db('duothan').collection('pharmacy').findOne({
        pharmacy_license_no:pharmacy_license_no
    });

    return result;
 
    if(result) {
        console.log(result);
    } else {
        console.log("No records");
    }
}

export async function updatePharmacy(pharmacy_license_no, updatedPharmacy) {
    const result = await client.db('duothan').collection('pharmacy').updateOne({
        pharmacy_license_no:pharmacy_license_no
    }, {$set: updatedPharmacy});
 
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

export async function deletePharmacy(pharmacy_license_no) {
    const result = await client.db('duothan').collection('pharmacy').deleteOne({
        pharmacy_license_no:pharmacy_license_no
    });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// Drug functions
export async function createDrug(newDrug) {
    const result = await client.db('duothan').collection('drug').insertOne(newDrug);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

export async function readDrugs(query) {
    const cursor = await client.db('duothan').collection('drug').aggregate([
        {$match: query?query:{}}, 
        {
            $lookup:{
            from:'pharmacy',
            localField:'pln',
            foreignField:'pharmacy_license_no',
            as: 'pharmacyDetails'
        }
    }]);
    const results = await cursor.toArray();
    return results;
}

export async function readDrug(ndc) {
    const result = await client.db('duothan').collection('drug').findOne({
        ndc:ndc
    });
 
    return result;
    if(result) {
        console.log(result);
    } else {
        console.log("No records");
    }
}

export async function updateDrug(ndc, updatedDrug) {
    const result = await client.db('duothan').collection('drug').updateOne({
        ndc:ndc,
    }, {$set: updatedDrug});
 
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

export async function deleteDrug(ndc) {
    const result = await client.db('duothan').collection('drug').deleteOne({
        ndc:ndc
    });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// User functions
export async function createUser(newUser) {
    const result = await client.db('duothan').collection('users').insertOne(newUser);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

export async function readUsers() {
    const cursor = await client.db('duothan').collection('users').find();
    const results = await cursor.toArray();
 
    return results;

    if(results.length > 0) {
        results.forEach((result)=>{
            console.log(result);
        });
    } else{
        console.log("empty set");
    }
}

export async function readUser(email) {
    const result = await client.db('duothan').collection('users').findOne({
        email:email
    });
 
    return result;

    if(result) {
        console.log(result);
    } else {
        console.log("No records");
    }
}

export async function updateUser(email, updatedUser) {
    const result = await client.db('duothan').collection('users').updateOne({
        email:email
    }, {$set: updatedUser});
 
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

export async function deleteUser(email) {
    const result = await client.db('duothan').collection('users').deleteOne({
        email:email
    });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

export async function signInUser(email, password) {
    const result = await client.db('duothan').collection('users').findOne({
        email:email
    });
    if(result) {
        if(result.password == password) {
            main()
            await client.db('duothan').collection('users').updateOne({
                email:email
            }, {$set:{login_status:1}});
            return 1;
        }
    }
    return 0;
} 

export async function logOutUser(email) {
    const result = await client.db('duothan').collection('users').findOne({
        email:email
    })
    if(result){
        main()
        await client.db('duothan').collection('users').updateOne({
            email:email
        }, {$set: {login_status:0}});
        return 1;
    }
    return 0;
} 


// {"_id":{"$oid":"63f86453f92ee8536d113577"},"name":"test","pharmacy_license_no":"test","email":"test","address":"test","district":"test","province":"test","city":"test","operational_hours":"test","owner_nic":"test"}""