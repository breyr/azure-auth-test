/*
 * Custom middleware classes must include:
 *  - public constructor with a parameter type of RequestDelegate
 *  - public method named Invoke or InvokeAsync which must:
 *      - return a task
 *      - accept a first parameter of type HttpContext
 */

namespace Backend.MiddleWare;

public class ResolveUnknownEndpoints
{
    private readonly RequestDelegate _next;

    public ResolveUnknownEndpoints(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        // check if the request path starts with /api
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = 404;
        }
        else
        {
            // call the next middleware in the pipeline
            await _next(context);
        }
    }
}

public static class ResolveUnknownEndpointsMiddlewareExtensions
{
    public static IApplicationBuilder UseResolveUnkownEndpoints(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ResolveUnknownEndpoints>();
    }
}