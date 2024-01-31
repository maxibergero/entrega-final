import { userModel } from "../src/models/users.models.js";
import Assert from "assert";
import mongoose from "mongoose";
import 'dotenv/config';
import { validatePassword } from "../src/utils/bcrypt.js";

const assert = Assert.strict;

await mongoose.connect(process.env.MONGO_URL);


describe('Testing Sessions  route /api/sessions', function () {

    it("Testing login de usuario ", async () => {

        const mail = "pedro@pedro.com";
        const user = await userModel.findOne({ email: mail })
        
        const res = validatePassword("1234", user.password)

        assert.equal(res, true)
    })

    
})