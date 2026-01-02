module.exports = (data, socket) => {
    try {
        data = JSON.parse(data.data)
    } catch (err) { return }

    let video_found = videos.filter((video) => video.id === data.video.id)[0]
    if (!video_found || !Array.isArray(data)) {
        return
    }

    for (let comment of data) {
        if(typeof comment !== "string" ) {
            break
        }

        video_found.comments.push(comment)
    }

    videos = videos.map((v) => v.id === data.video.id ? video_found : v)

    db.prepare("UPDATE videos SET data = ? WHERE id = 1").run(JSON.stringify(videos))
    socket.broadcast.emit("videosChanged", videos)
}
