export interface IFileUploadActionPayload {
  file: File;
  progressCallback: (progressEvent: ProgressEvent) => void;
}
