module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            notification: Object,
            schedule: Number,
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Later with more info, add appropriate types and index for performance
    // schema.schema.index({ _id: 1, schedule: 1 });

    return mongoose.model("Notification", schema);
};