import { Col, Row } from "antd";
import { Job } from "../types/job.types";
import { JobCard } from "./job-card";

export const JobGrid = ({ jobs }: { jobs: Job[] }) => (
  <Row gutter={20}>
    {jobs.map((job) => (
      <Col lg={8} xs={24} key={job.job_id}>
        <JobCard job={job} />
      </Col>
    ))}
  </Row>
);
