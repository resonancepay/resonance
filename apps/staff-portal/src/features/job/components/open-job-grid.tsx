import { Col, Row } from "antd";
import { OpenJob } from "../types/job.types";
import { OpenJobCard } from "./open-job-card";

export const OpenJobGrid = ({ jobs }: { jobs: OpenJob[] }) => (
  <Row gutter={20}>
    {jobs.map((job) => (
      <Col lg={8} xs={24} key={job.job_id}>
        <OpenJobCard job={job} />
      </Col>
    ))}
  </Row>
);
