#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>
#include <string>

namespace demo
{

    class MyObject : public node::ObjectWrap
    {
    public:
        static void Init(v8::Local<v8::Object> exports);

    private:
        //explicit MyObject(double id = 0);
        explicit MyObject(double id = 0, std::string value = "");
        ~MyObject();

        static void New(const v8::FunctionCallbackInfo<v8::Value> &args);
        static void ShowResult(const v8::FunctionCallbackInfo<v8::Value> &args);

        double id_;
        std::string value_;
    };

} // namespace demo

#endif