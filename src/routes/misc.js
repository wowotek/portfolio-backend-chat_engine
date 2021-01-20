const express = require("express");


const miscRoutes = express.Router();


miscRoutes.get("/ping", async (req, res) => {
    res.json({
        status: "success",
        content: "pong!"
    });
});

miscRoutes.get("/sanity_check", async (req, res) => {
    res.json({
        status: "success",
        content: "sane"
    });
})


module.exports = {
    miscRoutes
};