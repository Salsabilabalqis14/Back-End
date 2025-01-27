const dataUserSchema = require('../models/data-user')
const fs = require('fs')

module.exports = {
    getUserData: async (req, res) => {
        try {
            const userId = req.user.userId

            const userData = await dataUserSchema.find({ userId })

            if (!userData) {
                return res.status(404).json({ message: 'User data not found' });
            }

            res.status(200).json({ status: 'Success', data: userData });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addUserData: async (req, res) => {
        try {
            const data = {
                fullName: req.body.fullName,
                email: req.body.email,
                noPhone: req.body.noPhone,
                birthPlace: req.body.birthPlace,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                school: req.body.school,
                instagram: req.body.instagram,
                address: req.body.address,
                motivation: req.body.motivation,
                portfolioFile: req.file.filename,
                portfolioUrl: `${req.protocol}://${req.get('host')}/uploads/portfolio-user/${req.file.filename}`,
                portfolio: req.body.portfolio,
                userId: req.user.userId
            }

            const newUserData = await dataUserSchema ( data )
            await newUserData.save()

            res.status(201).json({ status: 'Success', message: 'User data created successfully', data: newUserData})
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateUserData: async (req, res) => {
        try {
            const userId = req.user.userId

            const dataUser = await dataUserSchema.findOne({ userId })

            if (!dataUser) {
                return res.status(404).json({ message: 'Data user not found' })
            }

            const portfolioPath = `public/uploads/portfolio-user/${dataUser.portfolioFile}`
            fs.unlinkSync(portfolioPath)

            const updateData = {
                fullName: req.body.fullName,
                email: req.body.email,
                noPhone: req.body.noPhone,
                birthPlace: req.body.birthPlace,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                school: req.body.school,
                instagram: req.body.instagram,
                address: req.body.address,
                motivation: req.body.motivation,
                portfolioFile: req.file.filename,
                portfolioUrl: `${req.protocol}://${req.get('host')}/uploads/portfolio-user/${req.file.filename}`,
                portfolio: req.body.portfolio,
                userId: req.user.userId
            }

            const updatedUserData = await dataUserSchema.findOneAndUpdate(
                { userId },
                updateData,
                { new: true }
            );

            if (!updatedUserData) {
                return res.status(404).json({ error: 'Data user not found.' });
            }

            res.status(200).json({ status: 'Success', message: 'Data user updated successfully' })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}