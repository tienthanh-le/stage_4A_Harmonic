#include <napi.h>
#include "CRestapiDefault.h"

using namespace std;

/* Ipstream funcitons */
static CRestapiDefault s_oCRestapiDefault;

static Napi::Array Get_ipstream(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    // Error handling https://github.com/nodejs/node-addon-api/blob/main/doc/error_handling.md
    // Check the number of arguments passed.
    if (info.Length() != 1)
    {
        throw Napi::Error::New(env, "Argument error Get_ipstream(id): must be 1 id only");
    };

    //Check the argument types
    if (!info[0].IsNumber())
    {
        throw Napi::Error::New(env, "Argument error: Get_ipstream(id): id must be a number");
    };

    // Perform operation
    string data[6];
    unsigned int id = (unsigned int)info[0].ToNumber();

    Napi::Array temp_arr = Napi::Array::New(env, 6);
    s_oCRestapiDefault.getdata(id, data);

    for (int i = 0; i < 6; i++)
    {
        temp_arr[i] = Napi::String::New(env, data[i]);
    }

    // function returns as an array in js
    return temp_arr;
}

static Napi::Value Set_ipstream(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    // Error handling https://github.com/nodejs/node-addon-api/blob/main/doc/error_handling.md
    // Check the number of arguments passed.
    if (info.Length() != 7)
    {
        throw Napi::Error::New(env, "Argument error Set_ipstream(id): must be 1 id only");
    };

    //Check the argument types
    if (!info[0].IsNumber())
    {
        throw Napi::Error::New(env, "Argument error: Set_ipstream(id): id must be a number");
    };

    // Perform operation
    string data[6];
    unsigned int id = (unsigned int)info[0].ToNumber();

    for (int i = 0; i < 6; i++)
    {
        data[i] = (string)info[i + 1].ToString();
    }

    s_oCRestapiDefault.setdata(id, data);

    return env.Null();
}

/* ------- */

/* Demo functions */
static Napi::Boolean Compare(const Napi::CallbackInfo &info)
{
    // 2 args input, verify if they're the same value
    Napi::Env env = info.Env();

    // Check the number of arguments passed.
    if (info.Length() != 2)
        throw Napi::Error::New(env, "Method 'Compare' must be taking 2 arguments");

    //Check the argument types
    if (!info[0].IsNumber() || !info[1].IsNumber())
        throw Napi::Error::New(env, "Method 'Compare' must be taking number value arguments");

    return Napi::Boolean::New(env, info[0].ToNumber() == info[1].ToNumber());
}

static Napi::Array GenerateArray(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    // Check the argument types
    if (!info[0].IsNumber())
        throw Napi::Error::New(env, "Method 'Compare' must be taking number value arguments");

    return Napi::Array::New(env, (int)info[0].ToNumber());
}

static Napi::String GetData0(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    std::string get_data = (std::string)info[0].ToString();

    return Napi::String::New(env, get_data);
}

/* ------- */

static Napi::Object
Init(Napi::Env env, Napi::Object exports)
{
    s_oCRestapiDefault.init();

    exports.Set(Napi::String::New(env, "compare"),
                Napi::Function::New(env, Compare));

    exports.Set(Napi::String::New(env, "getData0"),
                Napi::Function::New(env, GetData0));

    exports.Set(Napi::String::New(env, "genArray"),
                Napi::Function::New(env, GenerateArray));

    exports.Set(Napi::String::New(env, "getIpstream"),
                Napi::Function::New(env, Get_ipstream));

    exports.Set(Napi::String::New(env, "setIpstream"),
                Napi::Function::New(env, Set_ipstream));

    return exports;
}

NODE_API_MODULE(addon, Init)
