const isApiError = (obj: APODImg[] | ApiError): obj is ApiError => {
  return 'code' in obj && 'message' in obj;
};

export { isApiError };
