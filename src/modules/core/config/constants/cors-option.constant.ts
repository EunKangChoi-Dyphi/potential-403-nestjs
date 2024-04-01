const CORS_OPTIONS = {
  allowedHeaders: ["content-type", "authorization"],
  origin: [
    // (front-end) local host url
    // (front-end) production host url
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONSS"],
  credentials: true,
};

export default CORS_OPTIONS;
