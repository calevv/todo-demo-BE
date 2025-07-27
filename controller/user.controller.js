const User = require('../model/User');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (!name || !email || !password) {
            throw new Error('이름, 이메일, 비밀번호는 필수 입력 항목입니다.');
        }

        if (user) {
            throw new Error('이미 가입한 유저입니다.');
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hash });
        await newUser.save();
        res.status(200).json({ status: 'ok', data: newUser });
    } catch (err) {
        console.error('Error in createUser:', err);

        res.status(400).json({ status: 'fail', error: err });
    }
};

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = user.generateToken();
                return res.status(200).json({ status: 'success', user, token });
            }
        }
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    } catch (err) {
        res.status(400).json({ status: 'fail', err });
        console.error('Error in loginWithEmail:', err);
    }
};

module.exports = userController;
