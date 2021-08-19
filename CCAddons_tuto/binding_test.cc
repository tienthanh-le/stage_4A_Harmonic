// hello.cc
#include <node.h>

namespace demo
{

    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;

    void Method(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();

        int i;
        double x = 100.1, y = 200.2;

        for (i = 0; i < 100; i++)
        {
            x += y;
        }

        auto total = Number::New(isolate, x);

        args.GetReturnValue().Set(total);

        // args.GetReturnValue().Set(String::NewFromUtf8(
        //                               isolate, "world")
        //                               .ToLocalChecked());
    }

    void Initialize(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "binding", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} // namespace demo