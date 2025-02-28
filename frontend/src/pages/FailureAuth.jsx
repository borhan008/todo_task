import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function FailureAuth() {
  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} className="py-8 px-4">
          <Typography variant="h4" component="h1" className="text-center">
            Authentication Failed
          </Typography>
          <Typography variant="body1" component="p" className="py-2">
            <strong>Most probable reasons:</strong>
          </Typography>
          <ol className="list-decimal px-4">
            <li>
              <Typography variant="body2" component="p">
                You have to connect the same gmail account you used to login
                with your ToDos app.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" component="p">
                Something went wrong. Please try again. Go to{" "}
                <Link to="/settings" className="text-blue-500">
                  Settings
                </Link>{" "}
                to connect your gmail account.
              </Typography>
            </li>
          </ol>
        </Paper>
      </Container>
    </div>
  );
}
