import { useMutation, useQuery } from "@tanstack/react-query";
import { jobs, uploadJobPicture, UploadJobPicturePayload } from "../services/job.service";

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: jobs,
  });
};

export const useUploadJobPicture = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: UploadJobPicturePayload) => uploadJobPicture(payload),
    onSuccess: sc,
    onError: ec,
  });
};
