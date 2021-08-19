/*!
* \file CLogo.cc
*@{*/

/*** Includes */
#include "CLogo.h"

using namespace std;
/*** Prototypes */

CLogo::CLogo() : logo_id(0)
{
    m_ologo.logo_number = 0;
    m_ologo.FTP_upload_enable = 0;
    memset(&m_ologo.logo_pathname, 0, (MAX_SIZE_LOGO_PATHNAME + 1));
    memset(&m_ologo.logo_filename, 0, (MAX_SIZE_LOGO_FILENAME + 1));
};
CLogo::~CLogo(){};

string CLogo::get_logo_pathname() const
{
    string m_logo_pathname(m_ologo.logo_pathname);
    return m_logo_pathname;
}

void CLogo::set_logo_pathname(const std::string pathname)
{
    strncpy(m_ologo.logo_pathname, pathname.c_str(), MAX_SIZE_LOGO_PATHNAME);
    m_ologo.logo_pathname[MAX_SIZE_LOGO_PATHNAME] = '\0';
};

string CLogo::get_logo_filename() const
{
    string m_logo_filename(m_ologo.logo_filename);
    return m_logo_filename;
};

void CLogo::set_logo_filename(const std::string filename)
{
    strncpy(m_ologo.logo_filename, filename.c_str(), MAX_SIZE_LOGO_FILENAME);
    m_ologo.logo_pathname[MAX_SIZE_LOGO_FILENAME] = '\0';
};

/* EOF */