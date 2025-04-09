const Match = require("../model/matchModel");

const addMatch = async (req, res) => {
    try {
        const { team1, team2, venue, time, date, availableSeats } = req.body;

        if (!team1 || !team2 || !date || !venue || !time || !availableSeats) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }

        const match = new Match({
            team1,
            team2,
            venue,
            time,
            date,
            availableSeats,
        });

        await match.save();
        res.status(200).json({
            success: true,
            message: "Match added successfully",
            match,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the match",
            error: error.message,
        });
    }
};

const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        if (!matches.length) {
            return res.status(404).json({
                success: false,
                message: "No matches found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Matches fetched successfully",
            matches,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching matches",
            error: error.message,
        });
    }
}


const getMatchById = async (req, res) => {
    try {
        const { matchId } = req.params;
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Match fetched successfully",
            match,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the match",
            error: error.message,
        });
    }
}


const modifyMatch = async (req, res) => {
    try {
        const { matchId } = req.params;
        const { team1, team2, venue, time, date, availableSeats } = req.body;

        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found",
            });
        }

        if (team1) match.team1 = team1;
        if (team2) match.team2 = team2;
        if (venue) match.venue = venue;
        if (time) match.time = time;
        if (date) match.date = date;
        if (availableSeats) match.availableSeats = availableSeats;

        await match.save();
        res.status(200).json({
            success: true,
            message: "Match modified successfully",
            match,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while modifying the match",
            error: error.message,
        });
    }
}


module.exports = {
    addMatch,
    getAllMatches,
    modifyMatch,
    getMatchById,
};