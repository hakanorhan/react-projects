import express from "express";
export default async (req: express.Request, res: express.Response) => {
    
}

/*
app.get('/posts', verifyToken, (req: any, res: any) => {
    const body = req.body;
    posts.push(body)
    res.json(posts.filter(post => post.username === req.body.username));
})
*/

/*
function verifyToken(req: any, res: any, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')['1'];

    if(!token) {
        return res.json({ error: 'Unauthorized' }); // Corrected
    }

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(403).json({error: 'Forbidden and so'});
    }
}
*/