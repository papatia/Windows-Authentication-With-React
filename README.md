# Securing Your React Project with Windows Authentication using .NET 7: A Step-by-Step Guide
## Introduction
Papatia had an app that worked on-premise, and the decision was made to update its UI. To accomplish this, the Papatia team set up the React project. However, a challenge arose due to the existing use of LDAP authentication, which blocked the direct sending of inner requests.

As the Papatia team, the focus is on applying best practices. Extensive research was conducted to find a solution for using React with Windows Authentication.

Securing your web application is paramount to safeguarding sensitive data and ensuring authorized access. In this step-by-step guide, the Papatia team will demonstrate how to implement Windows Authentication in an ASP.NET Core WebAPI project using .NET 7. Additionally, the guide will cover the configuration of Cross-Origin Resource Sharing (CORS) to enable requests from your React server while maintaining the necessary security measures.  

### Part 1: Adding Windows Authentication to your ASP.NET Core WebAPI
Windows Authentication provides a robust mechanism for authenticating users using their Windows credentials. By enabling Windows Authentication in your ASP.NET Core WebAPI, you can ensure that only authenticated users with the necessary permissions can access your API endpoints.

To add Windows Authentication to your project, follow these steps:

Create an ASP.NET Core WebAPI project.

Open the Program.cs file and add the following code to enable Windows Authentication:

```

using Microsoft.AspNetCore.Authentication.Negotiate;

// ...

builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
    .AddNegotiate();
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
```
Update your appsettings.json file to enable Windows Authentication:
```
"iisSettings": {
    "windowsAuthentication": true,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:27193",
      "sslPort": 44311
    }
  }
  ```
Ensure you handle HTTPS redirection and configure the necessary middleware for authorization.

### Part 2: Configuring CORS for React Server Integration
Cross-Origin Resource Sharing (CORS) allows you to control access to your API endpoints from different origins. By configuring CORS policies, you can define which domains are allowed to make requests to your API. In our case, we want to enable requests from our React server.

To configure CORS in your ASP.NET Core WebAPI, follow these steps:

Open the Program.cs file and add the following code to configure CORS:

```
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

app.UseCors();
```
Replace "http://localhost:3000" with the appropriate URL for your React server.

### Part 3: Implementing Windows Authentication and CORS in your React Project
To make requests to your secured ASP.NET Core WebAPI from your React project, you need to include the necessary authentication and CORS headers.

Here is an example of how to implement this in your React project:

```
import { handleResponse, requestBase } from "../_helpers";

const apiBase = "https://localhost:7091/WeatherForecast";

class WeatherForecastService {
  getWeatherForecast() {
    let request = Object.assign({}, requestBase, { mode: "no-cors", method: "GET" });
    let url = `${apiBase}`;

    return fetch(url, request).then(handleResponse);
  }
}

const instance = Object.freeze(new WeatherForecastService());
export { instance as WeatherForecastService };
```
## Conclusion

By following this step-by-step guide and implementing Windows Authentication in your ASP.NET  Core WebAPI project and configuring CORS in your React project, you have taken important steps towards enhancing the security of your application.

Windows Authentication ensures that only authenticated users with appropriate permissions can access your API endpoints, providing an additional layer of security. By leveraging the power of users' Windows credentials, you can confidently protect your application's sensitive resources.

Configuring CORS allows you to control which domains are permitted to make requests to your API. By specifying the allowed origins, headers, and methods, you can restrict access to your API endpoints and prevent unauthorized requests. In our case, we allowed requests only from our React server running on "http://localhost:3000".

In your React project, you incorporated the necessary authentication and CORS headers while making requests to your ASP.NET  Core WebAPI. By setting the mode to "no-cors" and including the Authorization header, you ensured that the requests are properly authenticated and authorized using Windows Authentication.

Remember to customize the code snippets provided to match your specific project configurations, such as the API endpoint URL and React server URL.

By implementing Windows Authentication and configuring CORS, you have established a secure communication channel between your React frontend and 
Core WebAPI backend. This enables you to build robust, secure, and reliable web applications while safeguarding sensitive data and ensuring authorized access to your resources.

Continuously monitor and update your security measures to stay ahead of potential threats, ensuring the ongoing protection of your application and its users.
