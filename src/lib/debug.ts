
export const debug = {
  /**
   * Logs a debug message with a specific tag
   */
  log: (tag: string, message: string, data?: any) => {
    console.log(`[${tag}] ${message}`, data);
  },

  /**
   * Logs a component's props and state
   */
  component: (componentName: string, props: any, state?: any) => {
    console.log(`[${componentName}] Component Debug`, {
      props,
      state,
    });
  },

  /**
   * Logs API request/response data
   */
  api: (endpoint: string, request: any, response?: any) => {
    console.log(`[API] ${endpoint}`, {
      request,
      response,
    });
  },

  /**
   * Logs performance metrics
   */
  performance: (operation: string, startTime: number) => {
    const duration = Date.now() - startTime;
    console.log(`[Performance] ${operation}`, {
      duration: `${duration}ms`,
    });
  },

  /**
   * Logs error with stack trace
   */
  error: (context: string, error: Error, data?: any) => {
    console.log(`[${context}] Error occurred`, {
      error: {
        message: error.message,
        stack: error.stack,
      },
      ...data,
    });
  },
}; 